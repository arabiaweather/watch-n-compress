if [ $(ps aux | grep $USER | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  export PATH=/usr/local/bin:$PATH
  export NODE_ENV=production
  cd /var/njs/watch-n-compress && forever --spinSleepTime 10000 start watchJS.js >> foreverJs.log 2>&1
  cd /var/njs/watch-n-compress && forever --spinSleepTime 10000 start watchCss.js >> foreverCss.log 2>&1

fi
