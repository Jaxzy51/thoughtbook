import Thought from '../models/Thought.js';
import User from '../models/User.js';
const thoughtController = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // GET single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // POST new thought and push thought's _id to associated user's thoughts array
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // Push the new thought to the user's thoughts array
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a thought by _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            // Remove thought from user's thoughts array
            await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
            res.json({ message: 'Thought deleted' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a reaction stored in a single thought's reactions array
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
export default thoughtController;
