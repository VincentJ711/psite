# assumes passwordless ssh is set up (see readme)
import subprocess

rdir = '/root/psite'
serverFile=f'{rdir}/dist/server/entry.js'
start=f'{rdir}/start.sh'

def exec(cmd, pipestdout=False):
  """execs the given shell command"""
  out = subprocess.Popen(
    cmd,
    shell=True,
    stdout=None if pipestdout else subprocess.PIPE
  ).communicate()[0]

  if out != None:
    out = out.decode('utf-8').strip()

  return out

def ssh(ip, cmd, pipestdout=False):
  """execs the given cmd under the root user @ the given ip"""
  if '"' in cmd: raise Exception('cant pass double quotes in cmd')
  return exec(f'ssh root@{ip} "{cmd}"', pipestdout)

def build():
  print('generating build files...')
  print('-----------------------')

  exec('rm -rf dist')
  exec('rm -rf public/bundles')
  exec('npm run gulp flatten -- --prod', True)
  exec('npm run gulp bvendor -- --prod', True)
  exec('npm run gulp bclient -- --prod', True)

  print('\n\n-----------------')
  print('loading .serverip')

  ip = ''

  # read in the server ip
  with open('.serverip', 'r') as file:
    ip = file.read().replace('\n', '').strip()

  # get the pid of the running app
  pid = ssh(ip, 'pgrep node')

  if (pid):
    print(f'web server running on pid: {pid}. killing now')
    ssh(ip, f'kill -9 {pid}')

  # delete the current app
  ssh(ip, f'rm -rf {rdir} && mkdir {rdir}')

  # create a startup script to run the app. cd'ing into the dir is important
  ssh(ip, 'echo -e \'' \
    f'#! /bin/bash\n' \
    f'cd {rdir}\n' \
    f'node -r source-map-support/register {serverFile} > {rdir}/log.out ' \
    f'2> {rdir}/log.err < /dev/null &\' > {start} && chmod +x {start}'
  )

  print(f'uploading necessary files...')
  exec(f'scp -r public/ root@{ip}:{rdir}/public', True)
  exec(f'scp -r dist/ root@{ip}:{rdir}/dist', True)
  exec(f'scp package.json root@{ip}:{rdir}', True)
  exec(f'scp .app.config.json root@{ip}:{rdir}', True)
  exec(f'scp .domain-cert root@{ip}:{rdir}', True)
  exec(f'scp .domain-key root@{ip}:{rdir}', True)

  # you may want to upload the following 3 things if you are trying to
  # figure out why something is broken on the server
  # exec(f'scp gulpfile.js root@{ip}:{rdir}', True)
  # exec(f'scp tsconfig.json root@{ip}:{rdir}', True)
  # exec(f'scp -r src/ root@{ip}:{rdir}/src', True)

  print('installing node dependencies...')
  # source the profile so nvm/npm/node are found
  ssh(ip, f'source .profile 2>/dev/null && cd {rdir} && npm i --production', True)

  print('starting the app now...')
  ssh(ip, f'source .profile 2>/dev/null && {start}')
