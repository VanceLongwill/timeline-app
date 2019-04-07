mongoimport --db timeline --collection user --jsonArray --file userDump.json
mongoimport --db timeline --collection message --jsonArray --file messageDump.json
mongoimport --db timeline --collection reply --jsonArray --file replyDump.json
