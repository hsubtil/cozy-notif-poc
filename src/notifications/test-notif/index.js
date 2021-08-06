import template from './my-notification.hbs'
import appTemplate from '../app-layout.hbs'
import { NotificationView } from 'cozy-notifications'

class MyNotificationView extends NotificationView {
  getPartials () {
    return { 'app-layout': appTemplate }
  }
}
MyNotificationView.template = template
