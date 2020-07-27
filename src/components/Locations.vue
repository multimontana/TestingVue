<template>
    <div class="general_block">
        <h1 class="title">World Time</h1>
        <div class="error">
            <span>Error message</span>
        </div>
        <div>
            <div class="form_group area">
                <label for="area">
                    <span>Select an area</span>
                    <div class="select_block">
                        <select name="" id="area" @change="selectArea($event)">
                            <option v-for="(area,index) in getAreas" :value="area" v-bind:key="index">{{area}}</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="255px"
                             height="255px" viewBox="0 0 255 255"
                             style="enable-background:new 0 0 255 255;width: 17px;height: 17px;">
                            <g id="arrow-drop-down">
                                <polygon points="0,63.75 127.5,191.25 255,63.75   "/>
                            </g>
                        </svg>
                    </div>
                </label>
            </div>
            <div class="form_group location">
                <label for="location">
                    <span>Select a location</span>
                    <div class="select_block">
                        <select name="" id="location" @change="getTime($event)">
                            <option value="">SELECT A LOCATION</option>
                            <option v-for="(loc,index) in getLocations" :value="loc" v-bind:key="index">{{loc}}</option>
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="255px"
                             height="255px" viewBox="0 0 255 255"
                             style="enable-background:new 0 0 255 255;width: 20px;height: 20px;">
                            <g id="arrow-drop-down">
                                <polygon points="0,63.75 127.5,191.25 255,63.75   "/>
                            </g>
                        </svg>
                    </div>

                </label>
            </div>
            <div class="titme">
                <span class="time_title">The time in this location</span>
                <div class="time_content">{{createdDate}}</div>
                <div class="button">Reset the form</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'Locations',
        props: {
            msg: String
        },
        data() {
            return {
                selectedArea: '',
                createdDate: '',
            }
        },
        methods: {
            ...mapActions(['selectAllLocationsAction', 'getSelectedAreaTimeAction', 'getTimeByLocAndAreaAction']),
            selectArea(e) {
                this.selectedArea = e.target.value;
                this.getSelectedAreaTimeAction({url: "http://worldtimeapi.org/api/timezone/" + e.target.value})
            },
            getTime(e) {
                this.getTimeByLocAndAreaAction({url: 'http://worldtimeapi.org/api/timezone/' + this.selectedArea + '/' + e.target.value}).then((res) => {
                    this.createdDate = this.getDateWithUTCOffset(parseInt(res.data.utc_offset))

                })
            },
            getDateWithUTCOffset(inputTzOffset) {
                var now = new Date();
                var currentTzOffset = -now.getTimezoneOffset() / 60
                var deltaTzOffset = inputTzOffset - currentTzOffset;
                var nowTimestamp = now.getTime();
                var deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60;
                var outputDate = new Date(nowTimestamp + deltaTzOffsetMilli)
                var hours = outputDate.getHours();
                if (hours.toString().length == 1) {
                    hours = '0' + hours
                }
                return hours + ":" + outputDate.getMinutes();
            }
        },
        computed: {
            ...mapGetters(['getAreas', 'getLocations'])
        },
        created() {
            this.selectAllLocationsAction({url: 'http://worldtimeapi.org/api/timezone'})
        }
    }
</script>
<style scoped>
    .general_block {
        width: 400px;
        margin: 0 auto;
    }

    .title {
        font-size: 36pt;
        color: #5d547f;
    }

    .error {
        font-size: 12pt;
        background: #ffefe5;
        color: #d48c5c;
        padding: 7px;
        border-radius: 9px;
    }

    .form_group > label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .form_group > label, select {
        width: 100%;
    }

    .form_group > label {
        color: #5d547f;
        font-size: 12pt;
    }

    .form_group > label > span {
        padding: 10px 0;
        font-weight: bold;
    }

    select {
        border: 3px solid #86dada;
        border-radius: 3px;
        font-size: 21pt;
        padding: 10px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
    }

    .area {
        margin-top: 20px;
    }

    .location {
        margin-top: 30px;
    }

    .select_block {
        position: relative;
        width: 100%;
    }

    .select_block > svg {
        width: 20px;
        height: 20px;
        POSITION: ABSOLUTE;
        right: 18px;
        top: 21px;
    }

    .titme {
        margin-top: 30px;
    }

    .time_title {
        color: #5d547f;
        font-size: 12pt;
        font-weight: bold;
        width: 100%;
        display: flex;
    }

    .time_content {
        font-size: 48pt;
        color: #5d547f;
        font-weight: bold;
        margin: 25px 0;
    }

    .button {
        background: #7edddd;
        width: 155px;
        margin: 0 auto;
        padding: 20px 12px;
        border-radius: 10px;
        color: #5d547f;
        font-weight: bold;
    }

    @media (max-width: 450px) {
        .general_block {
            width: 90%;
        }
    }
</style>
