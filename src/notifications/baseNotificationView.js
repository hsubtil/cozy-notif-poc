class MyNotification {
  async buildData() {
    return {
      // data that will be used in the template
    }
  }

  getPushContent() {
    return 'push content'
  }

  getTitle() {
    return 'title'
  }
}

MyNotification.template = require('./template.hbs')
MyNotification.preferredChannels = ['mail']
