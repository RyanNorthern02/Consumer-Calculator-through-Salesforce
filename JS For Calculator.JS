import { LightningElement,track,api } from 'lwc';
export default class ConsumerChoiceCalculator extends LightningElement {

    @api recordId;
    @api articleId;

    @track showComponent;
    @track errorFound;

    @track getSaleAmountTipPrompt;
    @track getTaxPercentageTipPrompt = '';
    @track getSurchargePercentageTipPrompt = '';
    @track getTipAmountTipPrompt = '';
    @track getTipAmountDollarTipPrompt = '';
    @track isTipAmount1Disabled = false;
    @track isTipAmount2Disabled = false;

    @track getSaleAmountTipAdjust;
    @track getTaxPercentageTipAdjust = '';
    @track getSurchargePercentageTipAdjust = '';
    @track getTipAmountTipAdjust = '';
    @track getTipAmountDollarTipAdjust = '';
    @track isTipAmountAdj1Disabled = false;
    @track isTipAmountAdj2Disabled = false;
    @track cashTipTotal2 = '';

    @track surTipPromptOutput = '' 
    @track taxTipPromptOutput = '';
    @track tipprmtOutput = '';
    @track chargePromptPercentage = '';
    @track getSaleAmountTipPromptOutput = '';
    @track taxTipAdjustOutput = '';
    @track tipAmountAdjustOutput = '';
    @track chargeadjpercentageOutput = '';

    @track tipQuestionVisible;
    @track tipQuestionVisible2;
    @track tipQuestionAnswer;
    @track beforeOrAfterQuestionAnswer;
    @track fieldVisible = false;
    @track disabled = true;

    @track visibility = false;

    connectedCallback(){
        if(this.recordId === this.articleId){
            this.showComponent=true
        } else{
            this.showComponent=false
        }
        //console.log('RecordId: ' + recordId);
        //console.log('articleId: ' + articleId);
    }

    get option1() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }

    get option2() {
        return [
            { label: 'During transaction', value: 'During transaction' },
            { label: 'After transaction', value: 'After transaction' },
        ];
    }

    toggleTipQuestion(event){
        
        this.tipQuestionVisible = event.target.value;
        console.log('toggleTipQuestion' + this.tipQuestionVisible);
        if (this.tipQuestionVisible === "Yes")
        {
            this.fieldVisible = true;
        }
        else
        {            
            this.fieldVisible = false;
        }
        this.validateInputsToEnableButton();
    }

    toggleTipQuestion2(event){
        
        this.tipQuestionVisible2 = event.target.value;
        console.log('toggleTipQuestion2' + this.tipQuestionVisible2);
        if (this.tipQuestionVisible2 === "After transaction" && this.chargeadjpercentage != null)
        {
            var workingNumber1 = (this.getSaleAmountTipAdjust / 100);
            workingNumber1 = workingNumber1 * this.getSurchargePercentageTipPrompt;
            this.surTipAdjust = workingNumber1;

            console.log('tip' + this.surTipAdjust);
    
            var finalchargeadj1 =  parseFloat(this.getSaleAmountTipPrompt) +  parseFloat(this.taxTipAdjust) + parseFloat(this.surTipAdjust);
            this.chargeadjpercentage= finalchargeadj1;

            console.log('final value' + this.chargeadjpercentage);
        }
        console.log('toggleTipQuestion2');
        this.validateInputsToEnableButton();
    }
    

    ////////////////////////////*ALL TIP PROMPT EVENT HANDLERS */////////////////////////////////
    
    //Sale Amount field event handler for Tip Prompt
    saleAmountTipPrompt(event){
        this.getSaleAmountTipPrompt = event.target.value;
        this.validateInputsToEnableButton();

    }

    //Tax Percentage field event handler for Tip Prompt
    taxPercentageTipPrompt(event){
        this.getTaxPercentageTipPrompt = event.target.value;
        this.validateInputsToEnableButton();
        
    }

    //Surcharge Percentage field event handler for Tip Prompt
    surchargePercentageTipPrompt(event){
        this.getSurchargePercentageTipPrompt = event.target.value;
        this.validateInputsToEnableButton();
    
    }

    //Tip Amount Percentage field event handler
    handleTipAmountPrompt1(event){
        this.getTipAmountTipPrompt = event.target.value;
        
        if (this.getTipAmountTipPrompt !== '') {
                this.getTipAmountDollarTipPrompt = '';
                this.isTipAmount2Disabled = true;
            } else {
                this.isTipAmount2Disabled = false;
            }
        this.validateInputsToEnableButton();

    }

    //Tip Amount Dollar field event handler
    handleTipAmountPrompt2(event){
        this.getTipAmountDollarTipPrompt = event.target.value;
        if (this.getTipAmountDollarTipPrompt !== '') {
                this.getTipAmountTipPrompt = '';
                this.isTipAmount1Disabled = true;
            } else {
                this.isTipAmount1Disabled = false;
            }
        this.validateInputsToEnableButton();

    }

    /////////////////////////////////////////*ALL TIP ADJUST EVENT HANDLERS */////////////////////////////////////

    //Sale Amount field event handler for Tip Prompt
    saleAmountTipAdjust(event){
        this.getSaleAmountTipAdjust = event.target.value;
        this.validateInputsToEnableButton();
    }

    //Tax Percentage field event handler for Tip Prompt
    taxPercentageTipAdjust(event){
        this.getTaxPercentageTipAdjust = event.target.value;
        this.validateInputsToEnableButton();
    }

    //Surcharge Percentage field event handler for Tip Prompt
    surchargePercentageTipAdjust(event){
        this.getSurchargePercentageTipAdjust = event.target.value;
        this.validateInputsToEnableButton();
       
    }

    //Tip Amount Percentage field event handler
    handleTipAmountAdjust1(event){
        this.getTipAmountTipAdjust = event.target.value;
        if (this.getTipAmountTipAdjust !== '') {
                this.getTipAmountDollarTipAdjust = '';
                this.isTipAmountAdj2Disabled = true;
            } else {
                this.isTipAmountAdj2Disabled = false;
            }
        this.validateInputsToEnableButton();

    }

    //Tip Amount Dollar field event handler
    handleTipAmountAdjust2(event){
        this.getTipAmountDollarTipAdjust = event.target.value;
        if (this.getTipAmountDollarTipAdjust !== '') {
                this.getTipAmountTipAdjust = '';
                this.isTipAmountAdj1Disabled = true;
            } else {
                this.isTipAmountAdj1Disabled = false;
            }
        this.validateInputsToEnableButton();
    }

    handleChange(event){
        console.debug("Handle Change Text")
       
    }

    ////////////////////////////////////Validation Error Messages for Tip Prompt ///////////////////////////////////

    validateInputsToEnableButton()
    {
        var disableButtonControl = false;
        console.log('validateInputsToEnableButton');
        console.log('validate getSurchargePercentageTipPrompt ' + this.getSurchargePercentageTipPrompt);

        //Validation for Tip Prompt Surcharge
        if (this.getSurchargePercentageTipPrompt == null  || this.getSurchargePercentageTipPrompt < 0 || this.getSurchargePercentageTipPrompt > 100) {

            disableButtonControl = true;
        }
        console.log('disableButtonControl ' + disableButtonControl);

        console.log('validate getTaxPercentageTipPrompt ' + this.getTaxPercentageTipPrompt);

        //Validation for Tip Prompt Tax
        if (!this.getTaxPercentageTipPrompt  || this.getTaxPercentageTipPrompt < 0 || this.getTaxPercentageTipPrompt > 30) {

            disableButtonControl = true;
        }
        console.log('disableButtonControl ' + disableButtonControl);

        console.log('validate getSaleAmountTipPrompt ' + this.getSaleAmountTipPrompt);
            
        //Validation for Tip Prompt, Tip Amount in percentage
        if (!this.getSaleAmountTipPrompt || this.getSaleAmountTipPrompt < 0) {

            disableButtonControl = true;
        }
        console.log('disableButtonControl ' + disableButtonControl);

        
        console.log('validate fieldVisible ' + this.fieldVisible);

        if(this.fieldVisible === true)
        {
            console.log('validate getSaleAmountTipPrompt ' + this.getSaleAmountTipPrompt);

            if (!this.getTipAmountTipPrompt || this.getSaleAmountTipPrompt < 0) {

                disableButtonControl = true;

            }
            console.log('disableButtonControl ' + disableButtonControl);

            console.log('validate getTipAmountTipPrompt ' + this.getTipAmountTipPrompt);

            if (!this.getSaleAmountTipPrompt  || this.getTipAmountTipPrompt < 0) {
                
                disableButtonControl = true;

            }
            
        }
        console.log('disableButtonControl ' + disableButtonControl);

        if(disableButtonControl){
                
            this.disabled = true;
        }
        else{
            this.disabled = false
        }
        console.log('disabled ' + this.disabled);

    }


    validateSaleAmountPrompt(event) {

        const input = event.target;
        const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptSaleAmount"]');

        const value = parseFloat(input.value);
         if (isNaN(value) || value < 1) {
         if (validationMessage) {
            validationMessage.innerHTML = "Please enter a number above or equal to 1";
            
        }
        } else {
        if (validationMessage) {
            validationMessage.innerHTML = "";
        }
    }
    }
    
    validateTipDollarPrompt(event) {

        const input = event.target;
        const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptTipDollar"]');

        const value = parseFloat(input.value);
         if (isNaN(value) || value < 1) {
         if (validationMessage) {
            validationMessage.innerHTML = "Please enter a number above or equal to 1";
        }
        } else {
        if (validationMessage) {
            validationMessage.innerHTML = "";
        }
    }
    }

    validateTipPercentagePrompt(event) {

        const input = event.target;
        const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptNew"]');

        const value = parseFloat(input.value);
         if (isNaN(value) || value < 1 || value > 100) {
         if (validationMessage) {
            validationMessage.innerHTML = "Please enter a number between 1 and 100.";
        }
        } else {
        if (validationMessage) {
            validationMessage.innerHTML = "";
        }
    }
    }

    validateSurchargePercentagePrompt(event) {

    const input = event.target;
    const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptSurcharge"]');

    const value = parseFloat(input.value);
     if (isNaN(value) || value < 0 || value > 100) {
     if (validationMessage) {
        validationMessage.innerHTML = "Please enter a number between 0 and 100.";
    }
    } else {
    if (validationMessage) {
        validationMessage.innerHTML = "";
    }
  }
    }

    validateTaxPercentagePrompt(event) {

    const input = event.target;
    const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptTax"]');

    const value = parseFloat(input.value);
     if (isNaN(value) || value < 0 || value > 30) {
     if (validationMessage) {
        validationMessage.innerHTML = "Please enter a number between 0 and 30.";
    }
    } else {
    if (validationMessage) {
        validationMessage.innerHTML = "";
    }
  }
    }

    ////////////////////////////////////Validation Error Messages for Tip Adjust ///////////////////////////////////

    validateSaleAmount(event) {

        const input = event.target;
        const validationMessage = this.template.querySelector('[data-id="validationMessageTipAdjustSaleAmount"]');

        const value = parseFloat(input.value);
         if (isNaN(value) || value < 1) {
         if (validationMessage) {
            validationMessage.innerHTML = "Please enter a number above or equal to 1";
        }
        } else {
        if (validationMessage) {
            validationMessage.innerHTML = "";
        }
    }
    }
     
    validateTipDollar(event) {

        const input = event.target;
        const validationMessage = this.template.querySelector('[data-id="validationMessageTipAdjustTipDollar"]');

        const value = parseFloat(input.value);
         if (isNaN(value) || value < 1) {
         if (validationMessage) {
            validationMessage.innerHTML = "Please enter a number above or equal to 1";
        }
        } else {
        if (validationMessage) {
            validationMessage.innerHTML = "";
        }
    }
    }

    validateTipPercentage(event) {

        const input = event.target;
        const validationMessage = this.template.querySelector('[data-id="validationMessageTipAdjustNew"]');

        const value = parseFloat(input.value);
         if (isNaN(value) || value < 1 || value > 100) {
         if (validationMessage) {
            validationMessage.innerHTML = "Please enter a number between 1 and 100.";
        }
        } else {
        if (validationMessage) {
            validationMessage.innerHTML = "";
        }
    }
    }

    validateSurchargePercentage(event) {

    const input = event.target;
    const validationMessage = this.template.querySelector('[data-id="validationMessageTipAdjustSurcharge"]');

    const value = parseFloat(input.value);
     if (isNaN(value) || value < 0) {
     if (validationMessage) {
        validationMessage.innerHTML = "Please enter the number 0.";
    }
    } else {
    if (validationMessage) {
        validationMessage.innerHTML = "";
    }
  }
    }

    validateTaxPercentage(event) {

    const input = event.target;
    const validationMessage = this.template.querySelector('[data-id="validationMessageTipAdjustTax"]');

    const value = parseFloat(input.value);
     if (isNaN(value) || value < 0 || value > 30) {
     if (validationMessage) {
        validationMessage.innerHTML = "Please enter a number between 0 and 30.";
    }
    } else {
    if (validationMessage) {
        validationMessage.innerHTML = "";
    }
    }
    }

    validateInputsBeforeCalculation()
    {
        this.errorFound = false;
        console.log('validateInputsBeforeCalculation');
        console.log('validate getSurchargePercentageTipPrompt ' + this.getSurchargePercentageTipPrompt);

        //Validation for Tip Prompt Surcharge
        if (this.getSurchargePercentageTipPrompt == null  || this.getSurchargePercentageTipPrompt < 0 || this.getSurchargePercentageTipPrompt > 100) {

            const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptSurcharge"]');
            validationMessage.innerHTML = "Please enter a number between 0 and 100.";
            this.errorFound = true;
        }
        else
        {
            const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptSurcharge"]');
            validationMessage.innerHTML = "";
        }
        console.log('validate getTaxPercentageTipPrompt ' + this.getTaxPercentageTipPrompt);

        //Validation for Tip Prompt Tax
        if (this.getTaxPercentageTipPrompt == null  || this.getTaxPercentageTipPrompt < 0 || this.getTaxPercentageTipPrompt > 30) {

            const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptTax"]');
            validationMessage.innerHTML = "Please enter a number between 0 and 30.";
            this.errorFound = true;

        }
        else
        {
            const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptTax"]');
            validationMessage.innerHTML = "";
        }
        console.log('validate getSaleAmountTipPrompt ' + this.getSaleAmountTipPrompt);
            //Validation for Tip Prompt, Tip Amount in percentage
        if (this.getSaleAmountTipPrompt == null  || this.getSaleAmountTipPrompt < 0) {

            const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptSaleAmount"]');
            validationMessage.innerHTML = "Please enter a number above or equal to 1";
            this.errorFound = true;

        }
        else
        {
            const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptSaleAmount"]');
            validationMessage.innerHTML = "";
        }
        
        console.log('validate fieldVisible ' + this.fieldVisible);

        if(this.fieldVisible === true)
        {
            console.log('validate getSaleAmountTipPrompt ' + this.getSaleAmountTipPrompt);

            if (this.getTipAmountTipPrompt == null  || this.getSaleAmountTipPrompt < 0) {

                const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptTipDollar"]');
                validationMessage.innerHTML = "Please enter a number above or equal to 1";
                this.errorFound = true;

            }
            else
            {
                const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptTipDollar"]');
                validationMessage.innerHTML = "";
            }
            console.log('validate getTipAmountTipPrompt ' + this.getTipAmountTipPrompt);

            if (this.getSaleAmountTipPrompt == null  || this.getTipAmountTipPrompt < 0) {
                const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptNew"]');
                validationMessage.innerHTML = "Please enter a number between 1 and 100.";
                this.errorFound = true;

            }
            else
            {
                const validationMessage = this.template.querySelector('[data-id="validationMessageTipPromptNew"]');
                validationMessage.innerHTML = "";
            }
        }

    }
////////////////////////////////////Calculate Buttons for Tip Prompt and Tip Adjust///////////////////////////////////

    calculateTipPrompt(event) {

        console.log('calculateTipPrompt');
        this.validateInputsBeforeCalculation();
        this.validateInputsToEnableButton();

        if(this.errorFound)
        {
            return;
        }

        //Taking Sale Amount, dividing by 100 to give percentage outcome and multiplied by Surcharge input to give New Card Purchase Price. This.pay will take in this new value and output it
        var workingNumber = (this.getSaleAmountTipPrompt / 100);
        console.log('getSaleAmountTipPrompt ' + this.getSaleAmountTipPrompt);
        console.log('workingNumber ' + workingNumber);

        workingNumber = workingNumber * this.getSurchargePercentageTipPrompt;
        console.log('getSurchargePercentageTipPrompt ' + this.getSurchargePercentageTipPrompt);
        console.log('workingNumber ' + workingNumber);

        this.surTipPrompt = workingNumber;
        console.log('surTipPrompt ' + this.surTipPrompt);

        console.log('-----------------');

        //These two lines are for Tip Prompt. It takes the Sale Amount and adds it to the the Surcharge Amount once converted to decimal
        var surchargetotalprompt = parseFloat(this.getSaleAmountTipPrompt) - parseFloat(this.surTipPrompt);
        this.surchargeTotalPrompt = surchargetotalprompt;
        console.log('getTaxPercentageTipPrompt ' + this.getSaleAmountTipPrompt);

        //Taking Sale Amount, dividing by 100 to give percentage outcome and multiplied by Tax input to give New Card Purchase Price with Tax. This.tax will take in this new value and output it
        var taxNumber = (this.surchargeTotalPrompt / 100);
        taxNumber = taxNumber * this.getTaxPercentageTipPrompt;
        this.taxTipPrompt = taxNumber;
        console.log('getTaxPercentageTipPrompt ' + this.getTaxPercentageTipPrompt);

        var Cashtotal = parseFloat(this.taxTipPrompt) +  parseFloat(this.surchargeTotalPrompt);
        this.cashTipTotal = Cashtotal;
        console.log('surchargeTotalPrompt ' + this.surchargeTotalPrompt);

        console.log('taxTipPrompt ' + this.taxTipPrompt);
        
        //Taking Sale Amount, dividing by 100 to give percentage outcome and multiplied by Tip input to give Tip Adjust Amount. This.tip will take in this new value and output it
        var tipnumber = (this.cashTipTotal / 100);
        tipnumber = tipnumber * this.getTipAmountTipPrompt;
        this.tipAmountPrompt= tipnumber;
        
         //Taking surchargeTotalPrompt, dividing by 100 to give percentage outcome and multiplied by Tip input to give Tip Prompt Amount. This.tipprmt will take in this new value and output it
         if(this.fieldVisible === true)
         {
            if(this.getTipAmountTipPrompt > 0){
            var tipnumberprompt = (this.cashTipTotal / 100);
            tipnumberprompt = tipnumberprompt * this.getTipAmountTipPrompt;
            this.tipprmt= tipnumberprompt;

            } else {
                var tipdollarchargePrompt = this.getTipAmountDollarTipPrompt
                this.tipprmt = tipdollarchargePrompt;
            }
        }
        else
        {
            this.tipprmt = 0;
        }
        //Takes Sale Amount, Tax Percentage, Surcharge Percentage and Tip Amount and adds them together
        var finalChargePrompt1 =  parseFloat(this.getSaleAmountTipPrompt) + parseFloat(this.taxTipPrompt) - parseFloat(this.surTipPrompt) + parseFloat(this.tipprmt);
        this.chargePromptPercentage= finalChargePrompt1;
          
        /////////////////////////////////////////////////////////////////////////Card Transaction Part////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //Taking Sale Amount, dividing by 100 to give percentage outcome and multiplied by Tax input to give New Card Purchase Price with Tax. This.tax will take in this new value and output it
        
        var taxNumber1 = (this.getSaleAmountTipPrompt / 100);
        taxNumber1 = taxNumber1 * this.getTaxPercentageTipPrompt;
        this.taxTipAdjust = taxNumber1;


        console.log('tax log ' + this.taxTipAdjust);

        var Cashtotal2 = parseFloat(this.getSaleAmountTipPrompt) + parseFloat(this.taxTipAdjust);
        this.cashTipTotal2 = Cashtotal2;

        if(this.fieldVisible === true)
        {
            //Taking Sale Amount, dividing by 100 to give percentage outcome and multiplied by Tip input to give Tip Adjust Amount. This.tip will take in this new value and output it
            if(this.getTipAmountTipPrompt > 0){
            var tipnumber1 = (this.cashTipTotal2 / 100);
            tipnumber1 = tipnumber1 * this.getTipAmountTipPrompt;
            this.tipAmountAdjust= tipnumber1;

            } else {
                var tipdollarcharge = this.getTipAmountDollarTipPrompt
                this.tipAmountAdjust = tipdollarcharge;
            }
        }
        else
        {
            this.tipAmountAdjust = 0;
        }

        console.log('tip log ' + this.cashTipTotal2);

        //Taking Sale Amount, dividing by 100 to give percentage outcome and multiplied by Surcharge input to give New Card Purchase Price. This.pay will take in this new value and output it
        var workingNumber1 = (this.cashTipTotal2 / 100);
        workingNumber1 = workingNumber1 * this.getSurchargePercentageTipPrompt;
        this.surTipAdjust = workingNumber1;

        //Takes Sale Amount, Tax Percentage, Surcharge Percentage and Tip Amount and adds them together

        var finalchargeadj1 =  parseFloat(this.getSaleAmountTipPrompt) +  parseFloat(this.taxTipAdjust) + parseFloat(this.tipAmountAdjust);
        this.chargeadjpercentage= finalchargeadj1;

        if (this.tipQuestionVisible2 === "After transaction" && this.fieldVisible === true){

            //this.chargeadjpercentage += parseFloat(this.getSaleAmountTipPrompt)/100 

            var tipdollarchargeAdjust = this.getTipAmountDollarTipPrompt
            this.tipAmountAdjust = tipdollarchargeAdjust;

            console.log('tip adjust question ' + this.tipAmountAdjust);

            var final = (this.getSaleAmountTipPrompt / 100);
            final = final * this.getTipAmountTipPrompt;
            this.tipAmountAdjust = final;

            console.log('tip adjust final after ' + this.tipAmountAdjust);

            this.chargeadjpercentage = parseFloat(this.getSaleAmountTipPrompt) + parseFloat(this.taxTipAdjust) + parseFloat(this.tipAmountAdjust);

            console.log('tip final after ' + this.chargeadjpercentage);

        }

        console.log('final charge ' + this.chargeadjpercentage);
  
        // Create the number formatter.
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            });
            
            this.surTipPromptOutput = formatter.format(this.surTipPrompt)
            this.taxTipPromptOutput = formatter.format(this.taxTipPrompt)
            this.tipprmtOutput = formatter.format(this.tipprmt)
            this.getTipAmountDollarTipPromptOutput = formatter.format(this.getTipAmountDollarTipPrompt)
            this.chargePromptPercentageOutput = formatter.format(this.chargePromptPercentage)
            this.surTipAdjustOutput = formatter.format(this.surTipAdjust)
            this.taxTipAdjustOutput = formatter.format(this.taxTipAdjust)
            this.tipAmountAdjustOutput = formatter.format(this.tipAmountAdjust)
            this.chargeadjpercentageOutput = formatter.format(this.chargeadjpercentage)
            this.getSaleAmountTipPromptOutput= formatter.format(this.getSaleAmountTipPrompt)
            this.visibility = true
    }
}