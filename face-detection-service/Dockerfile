FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

WORKDIR /app

COPY src/requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

COPY src/app /app

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]


