<script lang="ts">
	import { onMount } from 'svelte';
	import { APIClient, type Product } from 'salesbit-api-client';

	export let title: string;
	export let client: APIClient;
	export let layout: any = { '.form': { backgroundColor: 'red' } };

	let element: HTMLElement;
	let secured = true;

	onMount(async () => {
		console.log('onMount', client, element);
		const iframe = client.createMe(
			element,
			{ layout },
			{
				success: (me) => {
					console.log('me', me);
				},
				error: (err) => {
					console.log('err', err);
				}
			}
		);
		if (client.baseURL.startsWith('https:') && !window.location.protocol.startsWith('https')) {
			secured = false;
		}
	});
</script>

{#if secured}
	{#if client}
		<div>
			{#if title}
				<h3 class="text-xl">{title}</h3>
			{/if}
			<div style="border: 1px solid red; min-height: 100px;">
				<div bind:this={element}></div>
			</div>
		</div>
	{:else}
		<div style="color: red;">Client is not defined</div>
	{/if}
{:else}
	<div style="background-color: red; border-radius: 0.25rem; color: white; padding: 0.25rem;">
		The content inside can't be loaded because the page is not secured.
	</div>
{/if}
