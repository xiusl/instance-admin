<template>
<div style="padding: 20px 32px;">
    <el-table :data="products">
        <el-table-column type="index"/>
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="id"   label="Detail">
            <template slot-scope="scope">
                <router-link :to="{path:'/products/'+scope.row.id}">
                    详情
                </router-link>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import ProApi from '@/api/pro'
export default {
    name: 'products',
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.loadProduct()
    },
    methods: {
        loadProduct() {
            var that = this
            ProApi.getProducts().then(data => {
                this.products = data.products
            })
        }
    }
}
</script>
