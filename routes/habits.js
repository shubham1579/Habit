const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

// Display all habits
router.get("/", async (req, res) => {
    
    try{
        const habits = await Habit.find();
        res.render("index", { habits });
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }

});

router.get('/habits/:habitId', async (req, res) => {

    const habitId = req.params.habitId;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
    try{
        // Fetch habit details
        const habit = await Habit.findOne({ _id: habitId });
        
        // Fetch habit data for the last 7 days
        const habitData = await Habit.find({
            name: habit.name,
            date: { $gte: sevenDaysAgo },
        }).sort({ date: 'asc' });
    
        // Render the detail page with habit details and data
        res.render('habitDetail', { habit, habitData });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
  

router.get('/add', async (req, res) => {

    try{
        res.render('add.ejs');
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

})

// Add a new habit
router.post("/add", async (req, res) => {
    
    const { name, status } = req.body;

    const date = new Date().toISOString().split('T')[0];

    try {
        // Check if a habit with the same name and status exists for the same day
        const existingHabit = await Habit.findOne({
            name: name,
            status: status,
            date: date,
        });

        if (existingHabit) {
            res.redirect("/");
        }
        else {
            // Check if a habit with the same name exists but for a different status
            const sameNameHabit = await Habit.findOne({
                name: name,
                status: { $ne: status },
            });

            if(sameNameHabit){
                sameNameHabit.status = status;
                await sameNameHabit.save();
                res.redirect("/");
            }
            else {
                // Create a new entry
                const habit = new Habit({ name, status, date });
                await habit.save();
                res.redirect("/");
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
