def dockerImage
pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                script {
                    dockerImage = docker.build("project-slug-docker/demo-module/atlantis")
                }
            }
        }
        stage('push') {
            steps {
                script {
                    docker.withRegistry("https://artifactory.mjs.dops.stairways.ai", "art_creds") {
                        dockerImage.push("latest")      
                    }
                }
            }
        }
        stage('deploy') {
            steps {
                script {

                    def artUser
                    def artPass
                    withCredentials([usernamePassword(credentialsId: 'art_creds', usernameVariable: 'artUsername', passwordVariable: 'artPassword')]) {
                        artUser = artUsername
                        artPass = artPassword
                    }

                    withCredentials([sshUserPrivateKey(credentialsId: 'jsu-ssh-creds', keyFileVariable: 'privateKey', passphraseVariable: 'keyPass', usernameVariable: 'userName')]) {
                        def remote = [:]
                        remote.name = "debian-test-droplet-sfo03-01"
                        remote.host = "147.182.253.167"
                        remote.allowAnyHosts = trues
                        remote.user = userName
                        remote.passphrase = keyPass
                        remote.identityFile = privateKey
                        sshCommand remote: remote, command: '''
                            curl http://169.254.169.254/metadata/v1/id
                            cd /usr/docker
                            docker login https://artifactory.mjs.dops.stairways.ai --username ${artUser} --password ${artPass}
                            docker pull artifactory.mjs.dops.stairways.ai/project-slug-docker/demo-module/atlantis:latest
                            docker compose restart
                        '''
                    }
                }
            }
        }
    }
}