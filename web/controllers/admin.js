const Instrument = require('../models/instrument');

class InstrumentsControllers{

    getCreate = (req, res, next) => {
        res.render('instruments/create', {
          pageTitle: 'Add a instrument', 
          editing: false, 
          isAuthenticated: req.session.isLoggedIn       
        });
      }

    postCreate = (req, res, next) => {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const description = req.body.description;
      const videoId = req.body.videoId;
      const instrument = new Instrument({
        title: title,
        imageUrl: imageUrl,
        description: description,
        videoId: videoId,
      })
      instrument
        .save()
        .then(result =>{
          // console.log(result)
          console.log('created ins')
          res.redirect('/');
        })
        .catch(err => {
          console.log(err)
        })
    };

    getEdit = (req, res, next) => {
      const editMode = req.query.edit;
      
      if (!editMode) {
        return res.redirect('/');
      }
      const insId = req.params.instrumentId
      
      Instrument.findByPk(insId)
        .then(instruments => {
          const instrument = instruments
          if (!instrument) {
            return res.redirect('/');
          }
          res.render('instruments/create', {
            pageTitle: 'Edit instrument',
            path: '/instrument/edit',
            editing: editMode,
            instrument: instrument,
            isAuthenticated: req.isLoggedin
          });
        })
        .catch(err => console.log(err));
    };

    postEdit = (req, res, next) => {
        const insId = req.body.instrumentId;
        const updatedTitle = req.body.title;
        const updatedVideoId = req.body.videoId;
        const updatedImageUrl = req.body.imageUrl;
        const updatedDesc = req.body.description;
        Instrument.findByPk(insId)
          .then(instrument => {
            instrument.title = updatedTitle;
            instrument.videoId = updatedVideoId;
            instrument.description = updatedDesc;
            instrument.imageUrl = updatedImageUrl;
            return instrument.save();
          })
          .then(result => {
            console.log('UPDATED instrument!');
            res.redirect('/admin/instruments');
          })
          .catch(err => console.log(err));
      }
    getInstruments = (req, res, next) => {
      Instrument.findAll()
        .then(instruments => {
          console.log(instruments);
          res.render('admin/instruments', {
            ins: instruments,
            pageTitle: 'Admin Intruments',
            path: '/admin/instruments',
            isAuthenticated: req.isLoggedin
          });
        })
        .catch(err => console.log(err));
    };

    postDelete = (req, res, next) => {

      const insId = req.body.instrumentId;

      Instrument.findByPk(insId)
        .then(instrument => {
          console.log('id: ', instrument)
          return instrument.destroy();
        })
        .then(result => {
          console.log('DESTROYED instrument');
          res.redirect('/');
        })
        .catch(err => console.log(err));
    }; 
  


}




module.exports = new InstrumentsControllers