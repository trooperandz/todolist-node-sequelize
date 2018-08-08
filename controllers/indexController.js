'use strict';

module.exports = {
    // Serve the login page; force tasks page on first render for demonstration purposes
    renderIndexPage: (req, res) => {
      if (!req.session.hasLoadedApp) return res.redirect('/tasks');
      
      return res.render('index');
    },
};