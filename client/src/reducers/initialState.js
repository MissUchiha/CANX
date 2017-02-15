export default {
			categories: [
						{ name: "Uppercase",
						 	value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
						{	name:  "Lowercase",
						 	value: "abcdefghijklmnopqrstuvwxyz" },
						{	name: "Numbers",
						 	value: "0123456789" },
						{	name: "Math",
						 	value: "[]{}().*/\\!@#$%^&_-+=><" }
						],
			user : {
				// jwt: '123123',
				ident : "bezveze",
				name: 'Pera Peric',
				email: 'pera.peric@gmail.com',
				password: 'asdasd',
				avatar: '',
				id: "58937ef96e95521e47000000"
        // draw: {}
			},
      logged: !!localStorage.jwt,
}
