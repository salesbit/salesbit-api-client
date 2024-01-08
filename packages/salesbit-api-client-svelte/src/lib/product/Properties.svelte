<script lang="ts">
	import type { Product } from 'salesbit-api-client';

	export let title: string = '';
	export let product: Product;
</script>

<div>
	{#if title}
		<h2>Product</h2>
	{/if}
	<div>
		{JSON.stringify(product)}
	</div>
</div>
