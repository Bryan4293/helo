SELECT p.title, p.img, p.content, u.username, u.profile_pic
FROM helopost p
INNER JOIN helouser u ON p.author_id = u.id
WHERE p.id = $1;