module.exports = {
    getAll: async function(req, res) {
       const {helopost_id} = req.session.user;
       const {displayOwnBool} = req.params;
       const {search} = req.query;
 
       let posts = [];
 
       const db = req.app.get('db');
 
       if (displayOwnBool === 'true') {
          posts = await db.helopost.get_all_user();
       } else {
          posts = await db.helopost.get_all_without_user(helopost_id);
       }
 
       if (search) {
          const filteredPosts = posts.filter(post =>{
             return post.title.toLowerCase().includes(search.toLowerCase());
          });
 
          return res.status(200).json(filteredPosts);
       }
 
       res.status(200).json(posts);
    },
    getOne: async function(req, res) {
       const postId = parseInt(req.params.postId);
       const db = req.app.get('db');
       const post = await db.helopost.get_one(postId);
       res.status(200).json(post[0]);
    },
    create: async function(req, res) {
       const {id} = req.session.user;
       const {title, img, content} = req.body;
 
       const db = req.app.get('db');
 
       await db.helopost.create(id, title, img, content);
 
       res.sendStatus(200);
    }
 };