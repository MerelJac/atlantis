pipeline {
    agent { docker { image 'node:20.11.1-alpine3.19' } }
    stages {
        stage('prep') {
            steps {
                sh '''
                    npm install
                '''
            }
        }
        stage('test') {
            steps {
                sh '''
                    npm test
                '''
            }
        }
    }
}