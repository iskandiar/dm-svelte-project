import App from './App.svelte';
import { configureLiveApi } from 'dm-fetch'

configureLiveApi("https://dm-backend.herokuapp.com/api/dm/1/", "50fa2a36-81e9-4961-b473-58e0e4b410ad", false)

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

