<script>
  import Loadable from 'svelte-loadable'
  import Wrap from './_Wrap.svelte'
</script>

<Wrap>
  <Loadable loader={() => import('../components/SayHi.svelte')}>
    <div slot="loading">Loading...</div>
  </Loadable>
</Wrap>