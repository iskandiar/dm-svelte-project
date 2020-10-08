import App from './App.svelte';
import { configureLiveApi, configureOfflineApi } from 'dm-fetch'

// Get key from https://dm-backend.herokuapp.com/dm/4/register
configureLiveApi("https://dm-backend.herokuapp.com/api/dm/4", "___KEY___", true)

// configureOfflineApi()

const app = new App({
	target: document.body
});

