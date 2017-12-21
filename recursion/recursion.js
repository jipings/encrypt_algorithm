
// 简单的递归

function fn(n) {
    if(n === 0) {
        console.log(n);
        return ;
    };
   n * fn(n-1);
};

//fn(10);

// F(n)=F(n-1)+F(n-2)
function fsq(n) {
    if(n === 1 || n === 2) {
        return n;
    }
   return fsq(n-1)+fsq(n-2);
}
fsq(10);

// 时间复杂度为O(2^n)，空间复杂度为O(n)

