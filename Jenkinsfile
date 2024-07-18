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
    }
}