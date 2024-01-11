<script lang="ts">
	import { onMount } from 'svelte';
	import type { APIClient } from 'salesbit-api-client';

	export let client: APIClient;
	export let style: any;

	let me: any;

	let tab = 'login';

	let email: string;
	let password: string;
	let name: string;

	let loading = false;
	let mounted = false;

	onMount(async () => {
		try {
			const t1 = new Date();
			me = await client.getUserInfo();
			const t2 = new Date();
			console.log('getUserInfo', t2.getTime() - t1.getTime());
		} catch (err) {
			console.log(err);
		} finally {
		}
		mounted = true;
	});

	const onLogin = async () => {
		try {
			loading = true;
			me = await client.postLogin(email, password);
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};

	const onLogout = async () => {
		try {
			loading = true;
			await client.postLogout();
			me = null;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};

	const onRegister = async () => {
		try {
			loading = true;
			await client.postRegister(name, email);
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};
</script>

{#if mounted}
	<div class="form">
		{#if me?.id}
			<div>Hello, {me.name} ({me.email})</div>
			<div class="form-logout"><button on:click={onLogout} disabled={loading}>Logout</button></div>
		{:else}
			<div>
				{#if tab === 'login'}
					<form action="#" onsubmit="return false;">
						<div>
							<label for="email">Email</label>
							<input type="email" id="email" bind:value={email} required />
						</div>
						<div>
							<label for="password">Password</label>
							<input type="password" id="passowrd" bind:value={password} required />
						</div>
						<div>
							<button type="submit" on:click={onLogin} disabled={loading}>Log in</button>
						</div>
					</form>
				{:else if tab === 'register'}
					<form action="#" onsubmit="return false;">
						<div>
							<label for="name">Name</label>
							<input type="text" id="name" bind:value={name} required />
						</div>
						<div>
							<label for="email">Email</label>
							<input type="email" id="email" bind:value={email} required />
						</div>
						<!-- Password? -->
						<div>
							<button type="submit" on:click={onRegister} disabled={loading}>Register</button>
						</div>
					</form>
				{:else}
					<button
						class="form-login"
						on:click={() => {
							tab = 'login';
						}}>Login</button
					>
					or
					<button
						class="form-register"
						on:click={() => {
							tab = 'register';
						}}>Register</button
					>
				{/if}
			</div>
		{/if}
	</div>
{/if}
