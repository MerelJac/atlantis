pipeline {
    agent { docker { image 'node:20.11.1-alpine3.19' } }
    def dockerImage
    stages {
        stage('build') {
            dockerImage = docker.build("project-slug-docker/demo-module/atlantis")
        }
        stage('push') {
            docker.withRegistry("https://artifactory.mjs.dops.stairways.ai", "art_creds") {
                dockerImage.push("latest")      
            }
        }
    }
}