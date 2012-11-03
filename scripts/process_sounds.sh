random_string() { 
  echo "$(date +%s%N)$RANDOM" | md5sum | awk '{print $1}' 
}

find /var/www/unprocessed_sounds/ -type f | while read -r file
do
  (
  EXTENSION=${file##*.};
  newname=$(random_string)".$EXTENSION";
  echo "Moving $file to $newname to /var/www/sounds/";
  mv "$file" "$newname";
  mv "$newname" "/var/www/sounds/"
  )
done

echo "Emptying directory"
rm -rf /var/www/unprocessed_sounds/*
