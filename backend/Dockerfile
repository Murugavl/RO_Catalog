FROM python:3.10-slim

WORKDIR /app

# Install system dependencies if required
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# Bind to 0.0.0.0 inside the container so the host can access it
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
