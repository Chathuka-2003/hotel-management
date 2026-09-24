# 🐳 Docker Image & Containerization Practice

A hands-on Docker project created to understand the fundamentals of **Docker images, Dockerfiles, containers, port mapping, and application containerization**.

This project demonstrates how to package an application into a Docker image and run it inside a container.

---

## 📌 Project Overview

The main goal of this project is to learn the basic Docker workflow:

**Application → Dockerfile → Docker Image → Docker Container → Running Application**

Through this project, I practiced building a custom Docker image and running the application in an isolated container environment.

---

## 🛠️ Technologies Used

* 🐳 Docker
* 🐍 Python
* 🌐 Flask
* 🐧 Linux
* 📦 Dockerfile
* 🔧 Docker CLI

---

## 📂 Project Structure

```text
docker-project/
│
├── Dockerfile
├── app.py
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project:

```bash
cd docker-project
```

---

### 2. Build the Docker Image

Build the Docker image using:

```bash
docker build -t myapp .
```

### Explanation

* `docker build` → Builds a Docker image
* `-t myapp` → Gives the image a name
* `.` → Uses the current directory as the build context

Check the created image:

```bash
docker images
```

---

### 3. Run the Docker Container

Run the application using:

```bash
docker run -d \
  -p 5000:5000 \
  --name myapp \
  myapp
```

### Explanation

* `-d` → Runs the container in detached mode
* `-p 5000:5000` → Maps host port `5000` to container port `5000`
* `--name myapp` → Assigns a name to the container
* `myapp` → Docker image used to create the container

---

## 🔍 Check Running Containers

Use:

```bash
docker ps
```

To see all containers, including stopped containers:

```bash
docker ps -a
```

---

## 🌐 Access the Application

Open your browser and visit:

```text
http://localhost:5000
```

The application should now be running inside the Docker container.

---

## 📜 Useful Docker Commands

### List Docker Images

```bash
docker images
```

### List Running Containers

```bash
docker ps
```

### View Container Logs

```bash
docker logs myapp
```

### Stop the Container

```bash
docker stop myapp
```

### Start the Container Again

```bash
docker start myapp
```

### Remove the Container

```bash
docker rm myapp
```

### Remove the Image

```bash
docker rmi myapp
```

---

## 🧠 What I Learned

Through this project, I gained practical experience with:

* Understanding Docker images and containers
* Creating a Dockerfile
* Building custom Docker images
* Running applications inside containers
* Port mapping
* Container lifecycle management
* Viewing container logs
* Basic Docker CLI commands
* Application containerization

---

## 🎯 Learning Objective

The purpose of this project is to build a strong foundation in **Docker and containerization** as part of my journey toward **DevOps and Cloud Engineering**.

I plan to continue building on these concepts by exploring:

* Docker Compose
* Docker volumes
* Docker networks
* Multi-container applications
* CI/CD with Docker
* AWS container deployment
* Kubernetes

---

## 👨‍💻 Author

**Chathuka Hirunodhya**

Aspiring Cloud & DevOps Engineer

Learning by building and improving every day. 🚀

---

## ⭐ If You Find This Useful

Feel free to explore the repository and follow my journey as I continue learning **DevOps, Cloud Computing, Docker, AWS, and CI/CD**.
