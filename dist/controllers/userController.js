import User from '../models/User.js';
const userController = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a user by _id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a user by _id
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json({ message: 'User and associated thoughts deleted!' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
export default userController;
