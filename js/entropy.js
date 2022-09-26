function entropy(str) {

    let n = 0, entropy = 0;

    alph = new Array();

    for (i = 0; i < str.length; i++) {

        if (str[i] in alph) {
            alph[str[i]]++;
        }
        else {
            alph[str[i]] = 1;
        }
    }
    
    for (i in alph) {

        alph[i] /= str.length;
        n++;
    }
    
    for (i in alph) {

        entropy -= alph[i] * Math.log(alph[i]);
    }
    
    entropy /= Math.log(n);

    if (n == 1) {
        entropy = 0;
    }
    
    return entropy;
}

entrop = entropy(process.argv[2]);

console.log(entrop);