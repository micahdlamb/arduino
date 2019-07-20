import React from 'react';
import PropTypes from 'utils/propTypes';
import Moment from 'react-moment';

import { Media } from 'reactstrap';

import Avatar from 'components/Avatar';

const Notifications = ({ notificationsData }) => {
  if (notificationsData.length === 0)
    return 'No notifications'

  return (
    notificationsData.map(({ avatar, message, date }, i) => (
      <Media key={i} className="pb-2">
        <Media left className="align-self-center pr-2">
          <Avatar tag={Media} object src={avatar} alt="Avatar" />
        </Media>
        <Media body middle className="align-self-center pr-1">
          {message}
        </Media>
        <Media right className="align-self-center">
          <small className="text-muted">
            <Moment date={date} fromNow/>
          </small>
        </Media>
      </Media>
    ))
  );
};

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(
    PropTypes.shape({
      //id: PropTypes.ID,
      avatar: PropTypes.string,
      message: PropTypes.node,
      date: PropTypes.date,
    })
  ),
};

Notifications.defaultProps = {
  notificationsData: [],
};

export default Notifications;
