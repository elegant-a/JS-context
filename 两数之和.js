var twoSum = function(nums,target) { 
    for(let i=0;i<nums.length - 1;i++){
        for(let j=i+1;j<nums.length;j++){
            var first = nums[i];
            var second = nums[j];
            if(first + second == target){
                return  [i,j]
             }
        }
    }
};

