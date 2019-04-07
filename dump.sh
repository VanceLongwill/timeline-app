mongoexport -d timeline -c user --pretty --jsonArray -o userDump.json
mongoexport -d timeline -c message --pretty --jsonArray -o messageDump.json
mongoexport -d timeline -c reply --pretty --jsonArray -o replyDump.json
