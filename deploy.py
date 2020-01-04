# assumes passwordless ssh is set up (see readme)
import subprocess

rdir = '/root/psite'
serverFile=f'{rdir}/dist/server/entry.js'
start=f'{rdir}/start.sh'

def exec(cmd, pipestdout=False):
  out = subprocess.Popen(
    cmd,
    shell=True,
    stdout=None if pipestdout else subprocess.PIPE
  ).communicate()[0]

  if out != None:
    out = out.decode('utf-8').strip()

  return out

def ssh(ip, cmd, pipestdout=False):
  if '"' in cmd: raise Exception('cant pass double quotes in cmd')
  return exec(f'ssh root@{ip} "{cmd}"', pipestdout)

print('building application...')
print('-----------------------')

exec('rm -rf dist')
exec('rm -rf public/bundles')
exec('npm run gulp flatten -- --prod', True)
exec('npm run gulp bvendor -- --prod', True)
exec('npm run gulp bclient -- --prod', True)

print('\n\n-----------------')
print('loading .serverip')
with open('.serverip', 'r') as file:
  ip = file.read().replace('\n', '').strip()
  pid = ssh(ip, 'pgrep node')

  if (pid):
    print(f'web server running on pid: {pid}. killing now')
    ssh(ip, f'kill -9 {pid}')

  print(f'emptying {rdir}')
  ssh(ip, f'rm -rf {rdir} && mkdir {rdir}')

  print(f'creating a start script {start}')
  # important to cd into the dir so source-map-support is found
  ssh(ip, f'echo -e \'#! /bin/bash\ncd {rdir}\nnode -r source-map-support/register ' \
      f'{serverFile} > {rdir}/log.out 2> {rdir}/log.err < /dev/null &\' > {start} && ' \
      f'chmod +x {start}')

  print(f'copying necessary files...')
  exec(f'scp package.json root@{ip}:{rdir}', True)
  exec(f'scp -r public/ root@{ip}:{rdir}/public', True)
  exec(f'scp -r dist/ root@{ip}:{rdir}/dist', True)
  exec(f'scp .app.config.json root@{ip}:{rdir}', True)
  exec(f'scp .domain-cert root@{ip}:{rdir}', True)
  exec(f'scp .domain-key root@{ip}:{rdir}', True)
  # exec(f'scp gulpfile.js root@{ip}:{rdir}', True)
  # exec(f'scp tsconfig.json root@{ip}:{rdir}', True)
  # exec(f'scp -r src/ root@{ip}:{rdir}/src', True)

  print('installing node dependencies...')
  # source the profile so nvm/npm/node are found
  ssh(ip, f'source .profile 2>/dev/null && cd {rdir} && npm i --production', True)

  print('daemonizing now...')
  ssh(ip, f'source .profile 2>/dev/null && {start}')

  print('success! you may visit the server in about a minute @')
  print(f'http://{ip}')
