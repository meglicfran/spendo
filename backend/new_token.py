import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta

# Load current environment variables
ENV_PATH = ".env"
load_dotenv(dotenv_path=ENV_PATH)

# Load required variables
BASE_URL = os.getenv("BASE_URL")
SECRET_ID = os.getenv("SECRET_ID")
SECRET_KEY = os.getenv("SECRET_KEY")
TOKEN_URL = f"{BASE_URL}/api/v2/token/new/"


def refresh_access_token():
    response = requests.post(TOKEN_URL, json={
        "secret_id": SECRET_ID,
        "secret_key":SECRET_KEY
    })

    if response.status_code != 200:
        raise Exception(f"Failed to refresh token: {response.status_code}, {response.text}")

    data = response.json()
    new_access_token = data["access"]
    access_expires = data["access_expires"]
    new_refresh_token = data["refresh"]
    refresh_expires = data["refresh_expires"]
    access_expiry_time = datetime.now() + timedelta(seconds=access_expires)
    refresh_expiry_time = datetime.now() + timedelta(seconds=refresh_expires)

    # Read and update .env file
    with open(ENV_PATH, "r") as f:
        lines = f.readlines()

    with open(ENV_PATH, "w") as f:
        for line in lines:
            if line.startswith("ACCESS_TOKEN ="):
                f.write(f"ACCESS_TOKEN = {new_access_token}\n")
            elif line.startswith("REFRESH_TOKEN ="):
                f.write(f"REFRESH_TOKEN = {new_refresh_token}\n")
            else:
                f.write(line)

    print("New token generated successfully.")
    print(f"Acess token expires at: {access_expiry_time.strftime('%d-%m-%Y %H:%M:%S')}")
    print(f"Refresh token expires at: {refresh_expiry_time.strftime('%d-%m-%Y %H:%M:%S')}")

if __name__ == "__main__":
    refresh_access_token()
