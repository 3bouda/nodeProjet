const Reservation = require('../models/Reservation');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id }).populate('room');
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createReservation = async (req, res) => {
    const { room, startTime, endTime } = req.body;
    try {
        let reservation = new Reservation({
            user: req.user.id,
            room,
            startTime,
            endTime
        });
        await reservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateReservation = async (req, res) => {
    const { startTime, endTime } = req.body;
    try {
        let reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }
        if (reservation.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        reservation.startTime = startTime;
        reservation.endTime = endTime;
        await reservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id });
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }
        if (reservation.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Reservation.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Reservation removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};
