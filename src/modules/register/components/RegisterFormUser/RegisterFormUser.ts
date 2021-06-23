import User from "@/core/types/User";
import RegisterModule, { RegisterState } from "@/store/modules/RegisterModule";
import LinkBlockSample from "@/modules/landing/components/LinkBlockSample/LinkBlockSample.vue"
import { defineComponent } from "vue";
import { getModule } from "vuex-module-decorators";
import Api from "@/core/api/Api";
const registerModule = getModule(RegisterModule)

export default defineComponent({
    components: {
        LinkBlockSample
    },
    data() {
        return {
            isValidUsername: false,
            isUsernameAvailable: false,
            isVerifyingUsernameAvailability: false,
            isValidEPassword: false,
            isEPasswordEqual: false,
            isTouched: false,
            inputUsername: "",
            inputEPassword: "",
            inputEPasswordConfirm: "",
        };
    },
    methods: {
        validateUsername() {
            console.log('called')
            this.isValidUsername = User.USERNAME_REGEX.test(this.inputUsername);
            if (this.isValidUsername) {
                this.isVerifyingUsernameAvailability = true;
                const username = this.inputUsername.toString(); // deep copy
                setTimeout(() => {
                    if (this.inputUsername === username) { // verify if the username is not changed while waiting the timeout
                        Api.get('https://lcd.go-find.me/desmos/profiles/v1beta1/profiles/' + this.inputUsername).then((response) => {
                            if (this.inputUsername === username && response['profile']) {
                                //username already taken
                                this.isUsernameAvailable = false;
                            } else {
                                this.isUsernameAvailable = true;
                            }
                            this.isVerifyingUsernameAvailability = false;
                        })

                    } else {
                        this.isVerifyingUsernameAvailability = false;
                    }
                }, 200);
            }
        },
        validatePassword() {
            this.isValidEPassword = User.PASSWORD_REGEX.test(this.inputEPassword);
        },
        validatePasswordConfirm() {
            this.isEPasswordEqual = this.isValidEPassword && this.inputEPassword === this.inputEPasswordConfirm;
        },
        setUserInfo() {
            this.isTouched = true;
            //this.validateUsername();
            this.validatePassword();
            if (this.isValidUsername && this.isUsernameAvailable && !this.isVerifyingUsernameAvailability && this.isValidEPassword && this.isEPasswordEqual) {
                registerModule.setUsername(this.inputUsername);
                registerModule.setEPassword(this.inputEPassword);
                registerModule.nextState(RegisterState.StateMPasswordInput);
            }
        },
    },
});