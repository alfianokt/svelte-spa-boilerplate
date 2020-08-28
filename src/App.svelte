<script>
	import Router from 'svelte-spa-router'
	import routes from './routes'

	import Nav from './components/Nav.svelte'
</script>

<Nav />
<Router {routes}/>