
module.exports = router => {
  router.post('/login', (req, res) => res.send({ login: true }))
}
