import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Task from './models/Task';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/tasks').get((req, res) => {
    Task.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(tasks);
    });
});

router.route('/tasks/:id').get((req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (err)
            console.log(err);
        else
            res.json(task);
    });
});

router.route('/tasks/add').post((req, res) => {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({ 'task': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/tasks/update/:id').post((req, res) => {
    Task.findById(req.params.id, (err, task) => {
        if (!task)
            return next(new Error('Could not load document'));
        else {
            task.title = req.body.title;
            task.responsible = req.body.responsible;
            task.description = req.body.description;
            task.severity = req.body.severity;
            task.status = req.body.status;

            task.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/tasks/delete/:id').get((req, res) => {
    Task.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));