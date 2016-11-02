    
# Prepare your raspberry
    
    sudo apt-get update
    sudo apt-get install npm
    
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    sudo ln -sf /usr/local/n/versions/node/7.0.0/bin/node /usr/bin/node

# Run

    npm install
    npm start

# Dev

    npm run dev