<template>
<div>
    <div style="height:32px;"></div>
    <h3 style="margin-top:0px;">{{product.name}}</h3>
    <div>{{version.code}}(build: {{version.build_code}})</div>

    <div style="margin-top:20px">
        <a :href="version.ios_down_url"><strong>{{version.name}}</strong> 下载</a>
    </div>

    <el-table :data="versions" style="margin-top:80px">
        <el-table-column type="index"/>
            <el-table-column prop="id"   label="History"> 
            <template slot-scope="scope">
                <router-link :to="{path:'/products/'+product.id+'/versions/'+scope.row.id}" :style="{color: scope.row.id==version.id ? '#999': '#00f'}"> 
                    {{scope.row.name}}({{scope.row.code}})
                </router-link>
            </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">

        </el-table-column>
    </el-table>
</div>
</template>

<script>
import ProApi from '@/api/pro'
export default {
    name: 'version',
    data() {
        return {
            version: {},
            product: {},
            versions: [],
            p_id: '',
            v_id: ''
        }
    },
    watch: {
		$route() {
			this.v_id= this.$route.params.v_id;
            this.loadVersion()
            this.loadVersions()
		}
	},
    mounted() {
        this.p_id = this.$route.params.id
        this.v_id = this.$route.params.v_id
        this.loadVersion()
        this.loadProduct()
        this.loadVersions()
    },
    methods: {
        loadVersion() {
            ProApi.getVersion(this.v_id).then(data => {
                this.version = data
            })
        },
        loadProduct() {
            ProApi.getProduct(this.p_id).then(data => {
                this.product = data
            })
        },
        loadVersions() {
            ProApi.getVersions(this.p_id).then(data => {
                this.versions = data
            })
        }
    }
}
</script>

<style>
</style>
