const {createRobot} = require('probot')
const plugin = require('..')
const payload = require('./events/pr-edited')

describe('wip-bot', () => {
  let robot
  let github

  beforeEach(() => {
    robot = createRobot()
    plugin(robot)

    github = {
      repos: {
        createStatus: jest.fn()
      }
    }
    robot.auth = () => Promise.resolve(github)
  })

  describe('WIP status', () => {
    it('should change on PR update', async () => {
      await robot.receive(payload)

      expect(github.repos.createStatus).toHaveBeenCalled()
    })
  })
})
