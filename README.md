# Step-by-Step: Share Your Site on Local Network

1. Find Your Local IP Address
On Windows, open PowerShell or Command Prompt and run:
ipconfig
Look for something like:
IPv4 Address. . . . . . . . . . . : 192.168.1.42 (not the real one)

2. Serve Your Site with a Local Server
Depending on your setup, here are a few options:
🔹 Option A: Using Python
If you have Python installed:
# Python, this must be done with powershell, not wsl
python -m http.server 8080 --bind 0.0.0.0



# Note
Go enable the rule: local web server port 8080 for this to work
enable in windows defender firewall with advanced security