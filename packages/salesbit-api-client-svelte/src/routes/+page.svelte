<script lang="ts">
	import { onMount } from 'svelte';
	import { APIClient } from 'salesbit-api-client';
	import Properties from '$lib/product/Properties.svelte';
	import Price from '$lib/product/Price.svelte';
	import Checkout from '$lib/Checkout.svelte';
	import User from '$lib/User.svelte';

	let client: APIClient;
	let product;
	let loading = false;

	onMount(async () => {
		client = new APIClient(
			//'https://salesbit-panel.pages.dev',
			'http://localhost:5173',
			'11111111-1111-1111-1111-111111111111',
			'prj1-ZNoye-ffZDz-cyqMJ-3VOR9'
		);
		onGetProduct();
	});

	const onGetProduct = async () => {
		try {
			loading = true;
			const resp = await client.getProduct('1-17');
			console.log(resp);
			product = resp;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	};
</script>

{#if client}
	<User {client}></User>
{/if}

{#if product}
	<div>
		<Properties title="Properties" bind:product></Properties>
		<Price title="Price" bind:product></Price>
		<Checkout {client}></Checkout>
	</div>
{:else}
	<div>loading</div>
{/if}
