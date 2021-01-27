pipeline {
  agent any
  
  stages {
    stage('build') {
      steps {
        sh 'docker build -t psite .'
      }
    }

    stage('deploy') {
      steps {
        sh 'docker image tag psite pi0.local:5000/psite'
        sh 'docker push pi0.local:5000/psite'
        sh '''ssh pi0 '
          docker pull pi0.local:5000/psite && \
          docker stop psite0 || true && \
          docker rm psite0 || true && \
          docker run -d -p 8081:8080 \
          --restart unless-stopped \
          --name psite0 psite
        ' '''
      }
    }
  }
}