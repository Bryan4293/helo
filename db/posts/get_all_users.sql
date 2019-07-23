SELECT p.id, p.title, u.username, u.profile_pic
FROM helopost p
INNER JOIN helouser u ON p.author_id = u.id
ORDER BY p.id DESC;