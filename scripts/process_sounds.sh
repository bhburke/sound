echo "Adding sounds to database";
php process_sounds.php

find /var/www/unprocessed_sounds/ * -type f | while read -r file
do
  (
  echo "Moving $file to /var/www/sounds/";
  mv "$file" "/var/www/sounds/";
  )
done

echo "Emptying directory"
rm -rf /var/www/unprocessed_sounds/*
