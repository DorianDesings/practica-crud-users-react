const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const controller = {};

// Obtener todos los usuarios
controller.allUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).send({ error: 'Error al leer el archivo de usuarios' });

    res.send(JSON.parse(data));
  });
};

// Crear un usuario nuevo
controller.createUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).send({ error: 'Error al leer el archivo de usuarios' });

    const users = JSON.parse(data);

    const userExist = users.some(user => user.email === req.body.email);

    if (userExist) return res.status(409).send({ error: 'Ya existe un usuario con ese email' });

    const newUser = {
      userId: v4(),
      ...req.body
    };

    users.push(newUser);

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err) return res.status(500).send({ error: 'Error al guardar el archivo de usuarios' });

      res.status(200).send(users);
    });
  });
};

controller.updateUser = (req, res) => {
  console.log(req.body);
  fs.readFile(usersFile, (err, data) => {
    if (err) return res.status(500).send({ error: 'Error al leer el archivo de usuarios' });

    const users = JSON.parse(data);

    const userIndex = users.findIndex(user => user.userId === req.params.id);

    if (userIndex === -1) res.status(404).send({ error: 'Usuario no encontrado' });

    let user = users[userIndex];

    user = { ...user, ...req.body };

    users[userIndex] = user;

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err) {
        return res.status(500).send({ error: 'Error al guardar el archivo de usuarios' });
      }
      res.status(200).send(users);
    });
  });
};

controller.deleteUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) {
      console.log(err);

      return res.status(500).send({ error: 'Error al leer el archivo de usuarios' });
    }

    let users = JSON.parse(data);

    const userIndex = users.findIndex(user => user.userId === req.params.id);

    if (userIndex === -1) return res.status(404).send('Usuario no encontrado');

    users.splice(userIndex, 1);

    fs.writeFile(usersFile, JSON.stringify(users), err => {
      if (err) {
        console.log(err);

        return res.status(500).send({ error: 'Error al guardar el archivo de usuarios' });
      }

      res.status(200).send(users);
    });
  });
};

module.exports = controller;
