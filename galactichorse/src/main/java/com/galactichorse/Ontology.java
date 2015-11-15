package com.galactichorse;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.hp.hpl.jena.rdf.model.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Api(name = "ontology")
public class Ontology {
    @ApiMethod(name = "get", httpMethod = ApiMethod.HttpMethod.GET)
    public Collection<String> get() throws Exception {
        File f = new File("WEB-INF/accessibility-ontology.ttl");
        InputStream is = new FileInputStream(f);
        Model model = ModelFactory.createOntologyModel();
        Collection<String> c = new ArrayList<String>();
        model.read(is, null, "TURTLE");

        // list the statements in the Model
        StmtIterator iter = model.listStatements();

        // print out the predicate, subject and object of each statement
        while (iter.hasNext()) {
            Statement stmt = iter.nextStatement();  // get next statement
            Resource subject = stmt.getSubject();     // get the subject
            Property predicate = stmt.getPredicate();   // get the predicate
            RDFNode object = stmt.getObject();      // get the object

            c.add(subject.toString());
            c.add(" " + predicate.toString() + " ");
            if (object instanceof Resource) {
                c.add(object.toString());
            } else {
                // object is a literal
                c.add(" \"" + object.toString() + "\"");
            }
        }

        return c;
    }
}

class ElementBean {
    private Collection<ElementBean> elements;
    private Map<String, Object> subCategories;

    public Collection<ElementBean> getElements() {
        return elements;
    }

    public void setElements(Collection<ElementBean> elements) {
        this.elements = elements;
    }

    public Map<String, Object> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(Map<String, Object> subCategories) {
        this.subCategories = subCategories;
    }
}
