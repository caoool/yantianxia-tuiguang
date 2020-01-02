import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';

import '../imports/api/redirects'

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('react-target'));
});
