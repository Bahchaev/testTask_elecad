import React from "react";
import styles from "./styles.module.css"
import CategoryTreeBranch from "../CategoryTreeBranch";

export default function CategoryTree({initialData}) {

    const getTreeData = (data) => {
        let categories = {};
        data.forEach((item) => {
            if (!categories[item.category]) {
                categories[item.category] = []
            }
            categories[item.category].push(item.image);
        });

        return categories
    };

    const treeData = getTreeData(initialData);

    return (
        <div className={styles.categoryTree}>
            {
                Object.keys(treeData).map((branch) => {
                    return (
                        <CategoryTreeBranch
                            categoryTitle={branch.toString()}
                            images={treeData[branch]}
                            key={branch.toString()}
                        />
                    )
                })
            }
        </div>

    )
}