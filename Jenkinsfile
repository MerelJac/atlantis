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
        // stage('push') {
        //     steps {
        //         script {
        //             docker.withRegistry("https://artifactory.mjs.dops.stairways.ai", "art_creds") {
        //                 dockerImage.push("latest")      
        //             }
        //         }
        //     }
        // }
        stage('push') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'jsu-ssh-creds', keyFileVariable: 'privateKey', passphraseVariable: 'keyPass', usernameVariable: 'userName')]) {
                        def remote = [:]
                        remote.name = "debian-test-droplet-sfo03-01"
                        remote.host = "143.198.105.163"
                        remote.allowAnyHosts = true
                        remote.user = userName
                        remote.passphrase = keyPass
                        remote.identity = privateKey
                        sshCommand remote: remote, command: 'curl http://169.254.169.254/metadata/v1/id'
                    }
                }
            }
        }
    }
}